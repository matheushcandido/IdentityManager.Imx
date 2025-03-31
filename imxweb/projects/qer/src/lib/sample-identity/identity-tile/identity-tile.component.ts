import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ccc-identity-tile',
  templateUrl: './identity-tile.component.html',
  styleUrls: ['./identity-tile.component.scss']
})

export class IdentityTileComponent implements OnInit {
  public description = 'Navigae to the identities overview page';

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  public goToIdentities(): void {
    this.router.navigate(['sample-identities']);
  }
}