import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { toast } from 'sonner';

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialName?: string;
  onSaveName?: (name: string) => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
};

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  initialName = '',
  onSaveName,
  isDarkMode = false,
  onToggleTheme,
}) => {
  const [name, setName] = useState(initialName);
  const [notifications, setNotifications] = useState<boolean>(false);

  useEffect(() => {
    setName(initialName);
    const saved = localStorage.getItem('gatepass_notifications_enabled');
    setNotifications(saved ? saved === 'true' : false);
  }, [initialName]);

  const save = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error('Please enter a name');
      return;
    }
    localStorage.setItem('gatepass_display_name', trimmed);
    onSaveName?.(trimmed);
    toast.success('Settings saved');
    onClose();
  };

  const toggleNotifications = (val: boolean) => {
    setNotifications(val);
    localStorage.setItem('gatepass_notifications_enabled', String(val));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="display-name">Display name</Label>
            <Input 
              id="display-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name or organization"
            />
            <p className="text-xs text-muted-foreground">Shown in header and tickets.</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Dark mode</Label>
              <p className="text-xs text-muted-foreground">Toggle app theme.</p>
            </div>
            <Switch checked={isDarkMode} onCheckedChange={onToggleTheme} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Notifications</Label>
              <p className="text-xs text-muted-foreground">Enable basic notifications.</p>
            </div>
            <Switch checked={notifications} onCheckedChange={toggleNotifications} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={save}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;