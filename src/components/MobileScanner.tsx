import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';
import { 
  ArrowLeft, 
  Scan, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Camera,
  Flashlight,
  Users,
  Clock,
  Wifi,
  WifiOff,
  Download,
  Upload,
  QrCode,
  Shield,
  Activity
} from 'lucide-react';

interface MobileScannerProps {
  onBack: () => void;
}

interface ScanResult {
  id: string;
  ticketId: string;
  eventTitle: string;
  attendeeName: string;
  ticketType: string;
  seatNumber: string;
  status: 'valid' | 'invalid' | 'used' | 'expired';
  scanTime: string;
  walletAddress: string;
}

// Mock scan results for demonstration
const mockScanResults: ScanResult[] = [
  {
    id: '1',
    ticketId: 'TKT-001',
    eventTitle: 'Tech Conference 2024',
    attendeeName: 'Alice Johnson',
    ticketType: 'VIP',
    seatNumber: 'A-12',
    status: 'valid',
    scanTime: '10:15 AM',
    walletAddress: '0x742d...35Da'
  },
  {
    id: '2',
    ticketId: 'TKT-002',
    eventTitle: 'Tech Conference 2024',
    attendeeName: 'Bob Smith',
    ticketType: 'General',
    seatNumber: 'B-8',
    status: 'valid',
    scanTime: '10:12 AM',
    walletAddress: '0x8f3e...91Bc'
  },
  {
    id: '3',
    ticketId: 'TKT-003',
    eventTitle: 'Tech Conference 2024',
    attendeeName: 'Charlie Brown',
    ticketType: 'General',
    seatNumber: 'B-15',
    status: 'used',
    scanTime: '09:45 AM',
    walletAddress: '0x1a2b...78Ef'
  }
];

export function MobileScanner({ onBack }: MobileScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>(mockScanResults);
  const [manualTicketId, setManualTicketId] = useState('');
  const [offlineQueue, setOfflineQueue] = useState<ScanResult[]>([]);
  const [selectedEvent] = useState('Tech Conference 2024');

  // Simulate network status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1); // 90% online chance
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const simulateScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      const mockTickets = [
        { id: 'TKT-004', name: 'David Wilson', type: 'VIP', seat: 'A-5', status: 'valid' as const },
        { id: 'TKT-005', name: 'Emma Davis', type: 'General', seat: 'C-12', status: 'valid' as const },
        { id: 'TKT-006', name: 'Frank Miller', type: 'Student', seat: 'D-3', status: 'used' as const },
        { id: 'TKT-007', name: 'Grace Lee', type: 'General', seat: 'B-20', status: 'expired' as const },
      ];
      
      const randomTicket = mockTickets[Math.floor(Math.random() * mockTickets.length)];
      const newScan: ScanResult = {
        id: Date.now().toString(),
        ticketId: randomTicket.id,
        eventTitle: selectedEvent,
        attendeeName: randomTicket.name,
        ticketType: randomTicket.type,
        seatNumber: randomTicket.seat,
        status: randomTicket.status,
        scanTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        walletAddress: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
      };

      if (isOnline) {
        setScanResults(prev => [newScan, ...prev]);
        if (newScan.status === 'valid') {
          toast.success('Valid ticket scanned!', {
            description: `${newScan.attendeeName} - ${newScan.ticketType}`
          });
        } else if (newScan.status === 'used') {
          toast.error('Ticket already used!', {
            description: `${newScan.attendeeName} - ${newScan.ticketType}`
          });
        } else {
          toast.error('Invalid ticket!', {
            description: `${newScan.attendeeName} - ${newScan.ticketType}`
          });
        }
      } else {
        setOfflineQueue(prev => [newScan, ...prev]);
        toast.warning('Offline scan queued', {
          description: 'Will sync when connection is restored'
        });
      }
      
      setIsScanning(false);
    }, 1500);
  };

  const handleManualEntry = () => {
    if (!manualTicketId.trim()) return;
    
    const newScan: ScanResult = {
      id: Date.now().toString(),
      ticketId: manualTicketId,
      eventTitle: selectedEvent,
      attendeeName: 'Manual Entry',
      ticketType: 'General',
      seatNumber: 'N/A',
      status: 'valid',
      scanTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      walletAddress: '0x0000...0000'
    };

    setScanResults(prev => [newScan, ...prev]);
    setManualTicketId('');
    toast.success('Manual entry recorded');
  };

  const syncOfflineData = () => {
    if (offlineQueue.length > 0) {
      setScanResults(prev => [...offlineQueue, ...prev]);
      setOfflineQueue([]);
      toast.success(`Synced ${offlineQueue.length} offline scans`);
    }
  };

  const validScans = scanResults.filter(scan => scan.status === 'valid').length;
  const totalScans = scanResults.length;
  const checkedInCount = scanResults.filter(scan => scan.status === 'valid' || scan.status === 'used').length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Ticket Scanner</h1>
            <p className="text-muted-foreground">{selectedEvent}</p>
          </div>
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Badge variant="outline" className="flex items-center space-x-1">
                <Wifi className="h-3 w-3" />
                <span>Online</span>
              </Badge>
            ) : (
              <Badge variant="destructive" className="flex items-center space-x-1">
                <WifiOff className="h-3 w-3" />
                <span>Offline</span>
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Scanned</CardTitle>
              <QrCode className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalScans}</div>
              <p className="text-xs text-muted-foreground">
                {validScans} valid, {totalScans - validScans} invalid/used
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Checked In</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{checkedInCount}</div>
              <p className="text-xs text-muted-foreground">
                Attendees at event
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Queue Status</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{offlineQueue.length}</div>
              <p className="text-xs text-muted-foreground">
                Offline scans pending
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scanner Interface */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>QR Code Scanner</span>
                </CardTitle>
                <CardDescription>Point camera at ticket QR code</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mock Camera View */}
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center relative border-2 border-dashed border-border">
                  <div className="w-64 h-64 border-2 border-primary rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-primary/50" />
                  </div>
                  
                  {/* Scanner overlay */}
                  <div className="absolute inset-4 border-2 border-primary rounded-lg opacity-50"></div>
                  
                  {isScanning && (
                    <div className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button 
                    onClick={simulateScan} 
                    disabled={isScanning}
                    className="flex-1 flex items-center space-x-2"
                  >
                    <Scan className="h-4 w-4" />
                    <span>{isScanning ? 'Scanning...' : 'Scan Ticket'}</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setFlashlightOn(!flashlightOn)}
                    className={flashlightOn ? 'bg-yellow-100' : ''}
                  >
                    <Flashlight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Manual Entry */}
            <Card>
              <CardHeader>
                <CardTitle>Manual Entry</CardTitle>
                <CardDescription>Enter ticket ID manually if QR code fails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter ticket ID (e.g., TKT-001)"
                    value={manualTicketId}
                    onChange={(e) => setManualTicketId(e.target.value)}
                  />
                  <Button onClick={handleManualEntry} disabled={!manualTicketId.trim()}>
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Offline Controls */}
            {!isOnline && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-orange-700">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Offline Mode</span>
                  </CardTitle>
                  <CardDescription className="text-orange-600">
                    Scans are being queued for sync when connection is restored
                  </CardDescription>
                </CardHeader>
                {offlineQueue.length > 0 && (
                  <CardContent>
                    <Button 
                      onClick={syncOfflineData}
                      disabled={!isOnline}
                      className="w-full flex items-center space-x-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Sync {offlineQueue.length} Queued Scans</span>
                    </Button>
                  </CardContent>
                )}
              </Card>
            )}
          </div>

          {/* Recent Scans */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Scans</CardTitle>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <Download className="h-3 w-3" />
                    <span>Export</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {scanResults.slice(0, 10).map((scan) => (
                    <div key={scan.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {scan.status === 'valid' && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {scan.status === 'used' && (
                            <AlertTriangle className="h-5 w-5 text-orange-500" />
                          )}
                          {(scan.status === 'invalid' || scan.status === 'expired') && (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm">{scan.attendeeName}</p>
                          <p className="text-xs text-muted-foreground">
                            {scan.ticketId} • {scan.ticketType} • {scan.seatNumber}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={
                            scan.status === 'valid' ? 'default' : 
                            scan.status === 'used' ? 'secondary' : 
                            'destructive'
                          }
                        >
                          {scan.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{scan.scanTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security Features</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Verification Methods</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Cryptographic signature validation</li>
                  <li>• Blockchain ownership verification</li>
                  <li>• Anti-replay protection with nonces</li>
                  <li>• Time-based token validation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Offline Capabilities</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Signature verification without internet</li>
                  <li>• Local queue for failed network calls</li>
                  <li>• Automatic sync when connection restored</li>
                  <li>• Backup manual verification process</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}