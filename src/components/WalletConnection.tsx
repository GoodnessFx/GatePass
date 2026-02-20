import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner';
import {
  Wallet,
  Copy,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Smartphone
} from 'lucide-react';

interface WalletConnectionProps {
  isConnected: boolean;
  walletAddress?: string | null;
  onConnect: () => void;
}

const mockWallets = [
  { name: 'MetaMask', icon: '🦊', popular: true },
  { name: 'WalletConnect', icon: '🔗', popular: true },
  { name: 'Coinbase Wallet', icon: '🟦', popular: false },
  { name: 'Trust Wallet', icon: '📱', popular: false },
];

export function WalletConnection({ isConnected, walletAddress, onConnect }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showWalletDialog, setShowWalletDialog] = useState(false);

  const handleWalletConnect = async (walletName: string) => {
    if (isConnecting) return; // Prevent multiple connections

    setIsConnecting(true);

    try {
      // Direct connection without fake delay
      // For now, we only support injected providers (MetaMask, Brave, etc.)
      // In a full production app, we would use a library like @web3modal/react or @rainbow-me/rainbowkit
      // to handle specific wallet protocols (WalletConnect, Coinbase Wallet SDK, etc.)
      
      if (walletName === 'WalletConnect' || walletName === 'Coinbase Wallet') {
         // Fallback for demo: try injected first, if not warn user
         // Ideally this would invoke specific SDKs
         if (!(window as any).ethereum) {
             const getWallet = confirm('Wallet not found. Would you like to install a crypto wallet?');
             if (getWallet) {
               window.open('https://metamask.io/download/', '_blank');
             }
             throw new Error('Wallet not found. Please install a crypto wallet.');
         }
      }
      
      await onConnect(); // This calls the parent's handleWalletConnect which uses window.ethereum
      
      setIsConnecting(false);
      setShowWalletDialog(false);
    } catch (error) {
      console.error('Connection failed:', error);
      setIsConnecting(false);
      // Parent component handles toast errors usually, but we can double check
    }
  };

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast.success('Address copied to clipboard');
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected && walletAddress) {
    return (
      <div className="flex items-center gap-4">
        {/* Show connection badge only on larger screens to save space on mobile */}
        <Badge variant="secondary" className="hidden sm:inline-flex items-center space-x-2 px-3">
          <CheckCircle className="h-3 w-3 text-green-500" />
          <span>Connected</span>
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyAddress}
          className="flex items-center justify-center h-8 sm:h-10 rounded-full hover:bg-accent transition-colors px-2 sm:px-5 gap-2 sm:gap-3"
        >
          <Wallet className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden lg:inline">{formatAddress(walletAddress)}</span>
          <Copy className="hidden lg:inline h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={showWalletDialog} onOpenChange={setShowWalletDialog}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center h-8 sm:h-10 rounded-full hover:bg-accent transition-colors px-2 sm:px-5 gap-2 sm:gap-3"
        >
          <Wallet className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden lg:inline">Connect Wallet</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogDescription>
            Choose a wallet to connect to GatePass. You'll need a wallet to purchase tickets and manage your NFTs.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          {mockWallets.map((wallet) => (
            <Card
              key={wallet.name}
              className="cursor-pointer transition-colors hover:bg-muted/50 !min-h-0"
              onClick={() => handleWalletConnect(wallet.name)}
            >
              <CardContent className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{wallet.icon}</span>
                  <div>
                    <p className="font-medium">{wallet.name}</p>
                    {wallet.popular && (
                      <Badge variant="secondary" className="text-xs">Popular</Badge>
                    )}
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>

        {isConnecting && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="ml-2">Connecting...</span>
          </div>
        )}

        <div className="bg-muted/30 rounded-lg p-4 mt-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">New to crypto wallets?</p>
              <p className="text-muted-foreground">
                We recommend starting with MetaMask. It's beginner-friendly and works great with GatePass.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="ghost" className="flex items-center space-x-2">
            <Smartphone className="h-4 w-4" />
            <span>Use Mobile Wallet</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
