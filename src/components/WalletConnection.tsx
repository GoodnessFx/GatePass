import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner@2.0.3';
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
  walletAddress?: string;
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
    
    // Simulate wallet connection
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsConnecting(false);
      setShowWalletDialog(false);
      onConnect();
      toast.success(`Connected to ${walletName}`, {
        description: 'Your wallet has been successfully connected.'
      });
    } catch (error) {
      setIsConnecting(false);
      toast.error('Failed to connect wallet', {
        description: 'Please try again.'
      });
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
      <div className="flex items-center space-x-2">
        <Badge variant="secondary" className="flex items-center space-x-1">
          <CheckCircle className="h-3 w-3 text-green-500" />
          <span>Connected</span>
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={copyAddress}
          className="flex items-center space-x-2"
        >
          <Wallet className="h-4 w-4" />
          <span>{formatAddress(walletAddress)}</span>
          <Copy className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={showWalletDialog} onOpenChange={setShowWalletDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Wallet className="h-4 w-4" />
          <span>Connect Wallet</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogDescription>
            Choose a wallet to connect to PassMint. You'll need a wallet to purchase tickets and manage your NFTs.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3">
          {mockWallets.map((wallet) => (
            <Card 
              key={wallet.name}
              className="cursor-pointer transition-colors hover:bg-muted/50"
              onClick={() => handleWalletConnect(wallet.name)}
            >
              <CardContent className="flex items-center justify-between p-4">
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
                We recommend starting with MetaMask. It's beginner-friendly and works great with PassMint.
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