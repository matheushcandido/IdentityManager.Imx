import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SampleIdentitiesComponent } from './sample-identities/sample-identities.component';
import { MenuItem, MenuService, ClassloggerService, HELP_CONTEXTUAL, CdrModule, DataSourceToolbarModule, DataTableModule, LdsReplaceModule, HelpContextualModule } from 'qbm'
import { SampleIdentityDetailsComponent } from './sample-identity-details/sample-identity-details.component';
import { EuiCoreModule, EuiMaterialModule } from '@elemental-ui/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';
import { OrgChartModule } from '../org-chart/org-chart.module';
import { TilesModule } from '../tiles/tiles.module';
import { IdentityTileComponent } from './identity-tile/identity-tile.component';

const routes: Routes = [
  {
    path: 'sample-identities',
    component: SampleIdentitiesComponent,
    data: {
      contextId: HELP_CONTEXTUAL.SampleIdentities,
    }
  },
];

@NgModule({
  declarations: [
    SampleIdentitiesComponent,
    SampleIdentityDetailsComponent,
    IdentityTileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonModule,
    CdrModule,
    EuiCoreModule,
    EuiMaterialModule,
    TranslateModule,
    DataSourceToolbarModule,
    DataTableModule,
    LdsReplaceModule,
    HelpContextualModule,
    MatTabsModule,
    OrgChartModule,
    TilesModule,
  ],
  exports: [
    SampleIdentitiesComponent,
    SampleIdentityDetailsComponent,
    IdentityTileComponent,
  ]
})
export class SampleIdentityModule {
  constructor(
    private readonly menuService: MenuService,
    private readonly logger: ClassloggerService,
  ) {
    this.logger.info(this, '▶️ Sample identities Module loaded');
    this.setupMenu();
  }

  private setupMenu(): void {
    this.menuService.addMenuFactories((preProps: string[], features: string[]) => {

        const menu: MenuItem = {
          id: 'ROOT_SampleIdentities',
          title: '#LDS#Sample Identities',
          sorting: '50',
          route: routes[0].path
      }

      return menu;
    });
  }
}