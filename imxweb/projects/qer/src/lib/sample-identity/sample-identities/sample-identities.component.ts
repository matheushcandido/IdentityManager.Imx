import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { EuiLoadingService, EuiSidesheetService } from '@elemental-ui/core';
import { EntitySchema, DisplayColumns, CollectionLoadParameters, IClientProperty, ValType } from '@imx-modules/imx-qbm-dbts';
import { DataSourceToolbarSettings, DataSourceToolbarFilter } from 'qbm';
import { QerApiService } from '../../qer-api-client.service';
import { PortalPersonAll, PortalPersonUid } from '@imx-modules/imx-api-qer';
import { SampleIdentityDetailsComponent } from '../sample-identity-details/sample-identity-details.component';

@Component({
  selector: 'ccc-sample-identities',
  templateUrl: './sample-identities.component.html',
  styleUrls: ['./sample-identities.component.scss']
})

export class SampleIdentitiesComponent implements OnInit {

  public dstSettings: DataSourceToolbarSettings;
  public readonly schema?: EntitySchema;
  public readonly DisplayColumns = DisplayColumns;
  public navigationState: CollectionLoadParameters = { StartIndex: 0, PageSize: 20 };
  public filterOptions: DataSourceToolbarFilter[] = [];
  private displayedColumns: IClientProperty[] = [];

  constructor(private readonly qerApiClient: QerApiService, private readonly busyService: EuiLoadingService, private readonly sidesheet: EuiSidesheetService) {
    this.schema = this.qerApiClient.typedClient.PortalPersonAll.GetSchema();
    this.displayedColumns = [
      this.schema.Columns[DisplayColumns.DISPLAY_PROPERTYNAME],
      this.schema.Columns.DefaultEmailAddress,
      {
        ColumnName: 'viewDetailsButton',
        Type: ValType.String,
      }
    ];
  }

  public async ngOnInit(): Promise<void> {
    this.filterOptions = (await this.qerApiClient.client.portal_person_all_datamodel_get())?.Filters ?? [];
    await this.navigate();
  } 

  public async onIdentitySelected(identity: PortalPersonAll): Promise<any> {
    let overlay: OverlayRef = this.busyService.show();
    let response: PortalPersonUid;

    try{
      response = (await this.qerApiClient.typedClient.PortalPersonUid.Get(identity.GetEntity().GetKeys()[0])).Data[0];
    } finally {
      this.busyService.hide(overlay);
    }

    this.sidesheet.open(SampleIdentityDetailsComponent, {
      title: 'View details',
      headerColour: 'iris-blue',
      padding: '0',
      width: '600px',
      data: response
    });
  }

  public async onNavigationStateChanged(newState: CollectionLoadParameters): Promise<void> {
    if (newState) {
        this.navigationState = newState;
        await this.navigate();
    }
  }

  public async onSearch(keywords: string): Promise<void> {
    this.navigationState.startIndex = 0;
    this.navigationState.search = keywords;
    await this.navigate();
  }

  private async navigate(): Promise<void> {
    let busyIndicator: OverlayRef = this.busyService.show();

    try {
        const data = await this.qerApiClient.typedClient.PortalPersonAll.Get(this.navigationState);

        this.dstSettings = {
            displayedColumns: this.displayedColumns,
            dataSource: data,
            entitySchema: this.schema!,
            navigationState: this.navigationState,
            filters: this.filterOptions,
        };
    } finally {
        this.busyService.hide(busyIndicator);
    }
  }
}