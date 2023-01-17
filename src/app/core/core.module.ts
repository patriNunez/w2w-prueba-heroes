import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from './ensureModuleLoadedOnce.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
    super(parentModule);
  }
}
