
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface AppSettingsProps {
  onSubmit: (settings: AppSettingsType) => void;
}

export interface AppSettingsType {
  appName: string;
  appIcon: string;
  appIdentifier: string;
  appVersion: string;
  enableOfflineSupport: boolean;
  enablePushNotifications: boolean;
  platform: 'android' | 'ios' | 'both';
}

const defaultSettings: AppSettingsType = {
  appName: 'My Converted App',
  appIcon: 'default_icon.png',
  appIdentifier: 'com.example.app',
  appVersion: '1.0.0',
  enableOfflineSupport: true,
  enablePushNotifications: false,
  platform: 'both'
};

const AppSettings = ({ onSubmit }: AppSettingsProps) => {
  const [settings, setSettings] = useState<AppSettingsType>(defaultSettings);
  const [activePlatform, setActivePlatform] = useState<'android' | 'ios'>('android');

  const handleChange = (field: keyof AppSettingsType, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Set platform based on active tabs
    const platform = settings.platform;
    onSubmit({
      ...settings,
      platform
    });
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">App Settings</h2>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="appName">App Name</Label>
          <Input
            id="appName"
            value={settings.appName}
            onChange={(e) => handleChange('appName', e.target.value)}
            placeholder="My Mobile App"
          />
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="appIdentifier">App Identifier</Label>
          <Input
            id="appIdentifier"
            value={settings.appIdentifier}
            onChange={(e) => handleChange('appIdentifier', e.target.value)}
            placeholder="com.yourcompany.appname"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="appVersion">Version</Label>
          <Input
            id="appVersion"
            value={settings.appVersion}
            onChange={(e) => handleChange('appVersion', e.target.value)}
            placeholder="1.0.0"
          />
        </div>

        <div className="space-y-3">
          <Label>Platform Settings</Label>
          <Tabs defaultValue="android" onValueChange={(v) => setActivePlatform(v as 'android' | 'ios')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="android">Android</TabsTrigger>
              <TabsTrigger value="ios">iOS</TabsTrigger>
            </TabsList>
            <TabsContent value="android" className="pt-4">
              <div className="flex items-center space-x-3">
                <Switch 
                  id="androidBuild" 
                  checked={settings.platform === 'android' || settings.platform === 'both'}
                  onCheckedChange={(checked) => {
                    const newPlatform = checked 
                      ? (settings.platform === 'ios' ? 'both' : 'android')
                      : (settings.platform === 'both' ? 'ios' : 'none');
                    handleChange('platform', newPlatform);
                  }}
                />
                <Label htmlFor="androidBuild">Include Android Build</Label>
              </div>
            </TabsContent>
            <TabsContent value="ios" className="pt-4">
              <div className="flex items-center space-x-3">
                <Switch 
                  id="iosBuild"
                  checked={settings.platform === 'ios' || settings.platform === 'both'}
                  onCheckedChange={(checked) => {
                    const newPlatform = checked 
                      ? (settings.platform === 'android' ? 'both' : 'ios')
                      : (settings.platform === 'both' ? 'android' : 'none');
                    handleChange('platform', newPlatform);
                  }}
                />
                <Label htmlFor="iosBuild">Include iOS Build</Label>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-md font-medium">Features</h3>
          <div className="flex items-center space-x-3">
            <Switch 
              id="offline" 
              checked={settings.enableOfflineSupport}
              onCheckedChange={(checked) => handleChange('enableOfflineSupport', checked)}
            />
            <Label htmlFor="offline">Offline Support</Label>
          </div>
          <div className="flex items-center space-x-3">
            <Switch 
              id="push" 
              checked={settings.enablePushNotifications}
              onCheckedChange={(checked) => handleChange('enablePushNotifications', checked)}
            />
            <Label htmlFor="push">Push Notifications</Label>
          </div>
        </div>

        <div className="pt-4">
          <Button onClick={handleSubmit} className="w-full bg-forge-purple hover:bg-forge-vivid">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppSettings;
