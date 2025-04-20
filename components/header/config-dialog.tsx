"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings2 } from "lucide-react";
import { useAppContext } from "@/context";

export default function ConfigDialog() {
  const { config, setConfig } = useAppContext();
  const [open, setOpen] = useState(false);
  const [newConfig, setNewConfig] = useState({
    url: config.url,
    port: config.port,
    createPath: config.createPath,
    cganPath: config.cganPath,
    cvaePath: config.cvaePath,
    fusedPath: config.fusedPath,
    performancePath: config.performancePath,
    showCgan: config.showCgan,
    showCvae: config.showCvae,
    showFused: config.showFused,
    showPerformance: config.showPerformance,
  });

  useEffect(() => {
    console.log(config);
    setNewConfig(config);
  }, [config]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBooleanChange = ({
    name,
    checked,
  }: {
    name: string;
    checked: boolean;
  }) => {
    setNewConfig((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = () => {
    setOpen(false);
    setConfig(newConfig);
  };

  const onOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setNewConfig(config);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form onSubmit={(e) => e.preventDefault()}>
        <DialogTrigger asChild>
          <Button size="icon">
            <Settings2 className="h-4 w-4" />
            <span className="sr-only">Open settings</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="overflow-clip p-0 sm:max-w-[425px]">
          <DialogHeader className="bg-secondary-background border-b-2 p-4">
            <DialogTitle>Configs</DialogTitle>
            <DialogDescription>
              Change the configurations for the server.
            </DialogDescription>
          </DialogHeader>
          <div className="grid space-y-4 px-4">
            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-3 grid gap-3">
                <Label htmlFor="url-1">URL</Label>
                <Input
                  id="url-1"
                  name="url"
                  defaultValue={newConfig.url}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="port-1">Port</Label>
                <Input
                  id="port-1"
                  name="port"
                  defaultValue={newConfig.port}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="cganPath-1">Create Path</Label>
              <Input
                id="createPath-1"
                name="createPath"
                defaultValue={newConfig.createPath}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="cganPath-1">cGAN Path</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="cganPath-1"
                  name="cganPath"
                  defaultValue={newConfig.cganPath}
                  onChange={handleChange}
                />
                <Switch
                  id="showCgan-1"
                  name="showCgan"
                  defaultChecked={newConfig.showCgan}
                  onCheckedChange={(checked) =>
                    handleBooleanChange({ name: "showCgan", checked })
                  }
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="cvaePath-1">cVAE Path</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="cvaePath-1"
                  name="cvaePath"
                  defaultValue={newConfig.cvaePath}
                  onChange={handleChange}
                />
                <Switch
                  id="showCvae-1"
                  name="showCvae"
                  defaultChecked={newConfig.showCvae}
                  onCheckedChange={(checked) =>
                    handleBooleanChange({ name: "showCvae", checked })
                  }
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="fusedPath-1">Fused Path</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="fusedPath-1"
                  name="fusedPath"
                  defaultValue={newConfig.fusedPath}
                  onChange={handleChange}
                />
                <Switch
                  id="showFused-1"
                  name="showFused"
                  defaultChecked={newConfig.showFused}
                  onCheckedChange={(checked) =>
                    handleBooleanChange({ name: "showFused", checked })
                  }
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="performancePath-1">Peformance Path</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="performancePath-1"
                  name="performancePath"
                  defaultValue={newConfig.performancePath}
                  onChange={handleChange}
                />
                <Switch
                  id="showPerformance-1"
                  name="showPerformance"
                  defaultChecked={newConfig.showPerformance}
                  onCheckedChange={(checked) =>
                    handleBooleanChange({ name: "showPerformance", checked })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter className="bg-secondary-background border-t-2 p-4">
            <DialogClose asChild>
              <Button type="button" variant="neutral">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={JSON.stringify(config) === JSON.stringify(newConfig)}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
