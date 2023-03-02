export class AddonManager {
  protected addons: Map<string, any> = new Map();
  private requiredAddons: Array<any> = [];

  [key: string]: any;

  public getEntries() {
    return [...this.addons.entries()];
  }

  public addAddon(addon: any, name: string = addon.name): void {
    const instance = new addon();
    this.addInstanceProperties(instance);
    this.addons.set(name ?? addon.name, instance);
    this.addRequiredAddons(instance);
  }

  public removeAddon(name: string): void {
    const instance = this.addons.get(name);
    if (!instance) return;
    this.removeInstanceProperties(instance);
    this.addons.delete(name);
    this.removeRequiredAddons(instance);
    this.addRequiredAddons(this.requiredAddons);
  }

  private addInstanceProperties(instance: any): void {
    for (const prop in instance) {
      const descriptor = Object.getOwnPropertyDescriptor(instance, prop);
      if (descriptor && typeof descriptor.value === 'function') {
        this.addProperty(prop, descriptor.value.bind(this));
      } else {
        this.addProperty(prop, instance[prop]);
      }
    }
  }

  private removeInstanceProperties(instance: any): void {
    for (const prop in instance) {
      this.removeProperty(prop);
    }
  }

  private addRequiredAddons(instance: any): void {
    if (!instance.addRequiredAddons) return;
    instance.addRequiredAddons.forEach((addon: any) => {
      const instance = new addon();
      this.addInstanceProperties(instance);
      this.addons.set(addon.name, instance);
      this.addRequiredAddons(instance);
    });
  }

  private removeRequiredAddons(instance: any): void {
    if (!instance.addRequiredAddons) return;
    instance.addRequiredAddons.forEach((addon: any) => {
      const instance = this.addons.get(addon.name);
      if (!instance) return;
      this.removeInstanceProperties(instance);
      this.addons.delete(addon.name);
      this.removeRequiredAddons(instance);
    });
  }

  private addProperty(name: string, value: any): void {
    Object.defineProperty(this, name, {
      get() {
        return value;
      },
      set(newValue) {
        value = newValue;
      },
      configurable: true,
      enumerable: true,
    });
  }

  private removeProperty(name: string): void {
    delete this[name];
  }
}
