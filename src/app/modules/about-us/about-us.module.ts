import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  // register created components (residing within module) for them to have access to the imported modules below
  declarations: [
    AboutUsComponent
  ],
  imports: [CommonModule, AboutUsRoutingModule],
  // AboutUs module can be exported
  exports: [],
  // components replying on specific services
  providers: [],
})
export class AboutUsModule {}
