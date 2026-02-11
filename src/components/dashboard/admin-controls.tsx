import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Settings, Bell, Shield, Download } from "lucide-react";

export function AdminControls() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    System Controls
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Auto-Isolation</Label>
                            <p className="text-xs text-muted-foreground">Block high-risk IPs automatically</p>
                        </div>
                        <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Deep Packet Inspection</Label>
                            <p className="text-xs text-muted-foreground">Analyze payload contents</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Threat Feed Sync</Label>
                            <p className="text-xs text-muted-foreground">Real-time updates</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-sm">Anomaly Threshold (0.85)</Label>
                    <Slider defaultValue={[85]} max={100} step={1} className="w-full" />
                </div>

                <div className="space-y-2 pt-2">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                        <Download className="mr-2 h-4 w-4" /> Export Logs (CSV)
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                        <Bell className="mr-2 h-4 w-4" /> Configure Alerts
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
