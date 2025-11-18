import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
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
import { Html5QrcodeScanner } from 'html5-qrcode';
import { verifyQr } from '../utils/ticketing/security';

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
  const [currentEventId, setCurrentEventId] = useState<string>('1');
  const eventTitleMap: Record<string, string> = {
    '1': 'Tech Conference 2024',
    '2': 'Summer Music Festival',
    '3': 'Startup Pitch Night',
  };
  const selectedEventTitle = eventTitleMap[currentEventId] ?? 'Selected Event';
  const usedTicketsRef = useRef<Set<string>>(new Set());
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  // Simulate network status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1); // 90% online chance
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const startCameraScan = () => {
    setIsScanning(true);
    toast.info('Camera scanning started', {
      description: 'Point camera at QR code to scan'
    });
  };

  const stopCameraScan = () => {
    setIsScanning(false);
    if (scannerRef.current) {
      try {
        scannerRef.current.clear();
      } catch (error) {
        console.log('Scanner cleanup error:', error);
      }
      scannerRef.current = null;
    }
    toast.info('Camera scanning stopped');
  };

  const handleManualEntry = async () => {
    if (!manualTicketId.trim()) return;
    const qrString = manualTicketId.trim();
    const result = await verifyQr(
      qrString,
      'demo-salt',
      currentEventId,
      (tid) => usedTicketsRef.current.has(tid),
      (tid) => usedTicketsRef.current.add(tid),
      Date.now() - 60 * 60 * 1000
    );
    handleVerificationOutcome(qrString, result);
    setManualTicketId('');
  };

  const handleVerificationOutcome = (qrString: string, result: any) => {
    const parsed = qrString.split('|');
    const ticketId = parsed[0] ?? qrString;
    const attendeeName = 'Unknown';
    const statusMap: Record<string, ScanResult['status']> = {
      VALID: 'valid',
      ALREADY_USED: 'used',
      FAKE: 'invalid',
      TOO_EARLY: 'expired',
      EXPIRED: 'expired'
    };
    const status = statusMap[result.status] ?? 'invalid';

    const newScan: ScanResult = {
      id: Date.now().toString(),
      ticketId,
      eventTitle: selectedEvent,
      attendeeName,
      ticketType: 'General',
      seatNumber: 'N/A',
      status,
      scanTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      walletAddress: '0x0000...0000'
    };

    if (isOnline) {
      setScanResults(prev => [newScan, ...prev]);
    } else {
      setOfflineQueue(prev => [newScan, ...prev]);
    }

    if (status === 'valid') {
      toast.success('VALID ticket');
    } else if (status === 'used') {
      toast.error('ALREADY USED');
    } else if (result.status === 'TOO_EARLY') {
      toast.warning('TOO EARLY');
    } else {
      toast.error('FAKE/INVALID ticket');
    }
  };

  useEffect(() => {
    // Initialize HTML5 QR scanner when scanning starts
    const containerId = 'qr-reader';
    if (isScanning && !scannerRef.current) {
      const scanner = new Html5QrcodeScanner(containerId, { fps: 10, qrbox: 250 }, false);
      scanner.render(
        async (decodedText) => {
          const result = await verifyQr(
            decodedText,
            'demo-salt',
            currentEventId,
            (tid) => usedTicketsRef.current.has(tid),
            (tid) => usedTicketsRef.current.add(tid),
            Date.now() - 60 * 60 * 1000
          );
          handleVerificationOutcome(decodedText, result);
        },
        (error) => {
          // Ignore scan errors (noisy)
        }
      );
      scannerRef.current = scanner;
    }
    return () => {
      // Cleanup scanner on unmount or stop
      if (scannerRef.current) {
        try { scannerRef.current.clear(); } catch {}
        scannerRef.current = null;
      }
    };
  }, [isScanning, currentEventId]);

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
            <p className="text-muted-foreground">{selectedEventTitle}</p>
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

        {/* Event Selection */}
        <div className="mb-6">
          <Label className="text-sm">Select Event</Label>
          <div className="mt-2 max-w-xs">
            <Select onValueChange={(val) => setCurrentEventId(val)} defaultValue={currentEventId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Tech Conference 2024</SelectItem>
                <SelectItem value="2">Summer Music Festival</SelectItem>
                <SelectItem value="3">Startup Pitch Night</SelectItem>
              </SelectContent>
            </Select>
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
                {/* Camera Scanner */}
                <div className="aspect-square rounded-lg relative border-2 border-dashed border-border">
                  <div id="qr-reader" className="w-full h-full" />
                </div>

                <div className="flex space-x-2">
                  <Button 
                    onClick={isScanning ? stopCameraScan : startCameraScan} 
                    className="flex-1 flex items-center space-x-2"
                  >
                    <Scan className="h-4 w-4" />
                    <span>{isScanning ? 'Stop Scanning' : 'Start Scanning'}</span>
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