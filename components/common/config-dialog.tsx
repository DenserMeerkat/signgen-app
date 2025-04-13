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
  });

  useEffect(() => {
    console.log(config);
    setNewConfig(config);
  }, [config]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "url":
        setNewConfig({ ...config, url: value });
        break;
      case "port":
        setNewConfig({ ...config, port: value });
        break;
      case "createPath":
        setNewConfig({ ...config, createPath: value });
        break;
      case "cganPath":
        setNewConfig({ ...config, cganPath: value });
        break;
      case "cvaePath":
        setNewConfig({ ...config, cvaePath: value });
        break;
      case "fusedPath":
        setNewConfig({ ...config, fusedPath: value });
        break;
      default:
        break;
    }
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
          <div className="grid px-4">
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
            <p className="pt-0.5 text-end text-sm tracking-wide italic">{`${newConfig.url}:${newConfig.port}`}</p>
            <div className="grid gap-3">
              <Label htmlFor="cganPath-1">Create Skeletons Path</Label>
              <Input
                id="createPath-1"
                name="createPath"
                defaultValue={newConfig.createPath}
                onChange={handleChange}
              />
            </div>
            <p className="pt-0.5 text-end text-sm tracking-wide italic">{`${newConfig.url}:${newConfig.port}/${newConfig.createPath}`}</p>
            <div className="grid gap-3">
              <Label htmlFor="cganPath-1">cGAN Skeleton Path</Label>
              <Input
                id="cganPath-1"
                name="cganPath"
                defaultValue={newConfig.cganPath}
                onChange={handleChange}
              />
            </div>
            <p className="pt-0.5 text-end text-sm tracking-wide italic">{`${newConfig.url}:${newConfig.port}/${newConfig.cganPath}`}</p>
            <div className="grid gap-3">
              <Label htmlFor="cvaePath-1">cVAE Skeleton Path</Label>
              <Input
                id="cvaePath-1"
                name="cvaePath"
                defaultValue={newConfig.cvaePath}
                onChange={handleChange}
              />
            </div>
            <p className="pt-0.5 text-end text-sm tracking-wide italic">{`${newConfig.url}:${newConfig.port}/${newConfig.cvaePath}`}</p>
            <div className="grid gap-3">
              <Label htmlFor="fusedPath-1">Fused Skeleton Path</Label>
              <Input
                id="fusedPath-1"
                name="fusedPath"
                defaultValue={newConfig.fusedPath}
                onChange={handleChange}
              />
            </div>
            <p className="pt-0.5 text-end text-sm tracking-wide italic">{`${newConfig.url}:${newConfig.port}/${newConfig.fusedPath}`}</p>
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
