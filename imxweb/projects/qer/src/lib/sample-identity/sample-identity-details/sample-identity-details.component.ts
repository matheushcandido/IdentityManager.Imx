import { Component, Inject, OnInit } from '@angular/core';
import { EUI_SIDESHEET_DATA } from '@elemental-ui/core';
import { PersonConfig, PortalPersonUid } from '@imx-modules/imx-api-qer';
import { EntitySchema, IEntityColumn } from '@imx-modules/imx-qbm-dbts';
import { ProjectConfigurationService } from '../../project-configuration/project-configuration.service';

@Component({
  selector: 'ccc-sample-identity-details',
  templateUrl: './sample-identity-details.component.html',
  styleUrls: ['./sample-identity-details.component.scss']
})

export class SampleIdentityDetailsComponent implements OnInit {

  public columns: IEntityColumn[] = [];

  private schema: EntitySchema;

  constructor(@Inject(EUI_SIDESHEET_DATA) public readonly data: PortalPersonUid, private readonly configService: ProjectConfigurationService) 
  {
    this.schema = data.GetEntity().GetSchema();
  }

  public async ngOnInit(): Promise<void> {
    let config = (await this.configService.getConfig());
    let personConfig = config?.PersonConfig;
    let colNames = personConfig?.VI_MyData_WhitePages_DetailAttributes ?? [];
    this.columns =colNames.filter(colName => this.schema.Columns[colName]).map(colName => this.data.GetEntity().GetColumn(colName));
  }
}