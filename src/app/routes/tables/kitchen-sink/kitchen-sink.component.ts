import { RouterModule } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';

import { PageHeaderComponent } from '@shared';
import { TablesDataService } from '../data.service';
import { TablesKitchenSinkEditComponent } from './edit/edit.component';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Router } from '@angular/router';

@Component({
  selector: 'app-table-kitchen-sink',
  templateUrl: './kitchen-sink.component.html',
  styleUrl: './kitchen-sink.component.scss',
  providers: [TablesDataService],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MtxGridModule,
    PageHeaderComponent,
    MatTableModule,
    RouterModule,
  ],
})
export class TablesKitchenSinkComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly dataSrv = inject(TablesDataService);
  private readonly dialog = inject(MtxDialog);
  //firebase stuff
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  firestore: Firestore = inject(Firestore);

  items$: Observable<any[]> = new Observable<any[]>();

  itemCollection = collection(this.firestore, 'cleanedsampledatav2');

  constructor(private router: Router) {
    this.items$ = collectionData(this.itemCollection, {
      idField: 'id',
    }) as Observable<any[]>;

    collectionData(this.itemCollection, { idField: 'createdAt' }).subscribe((items: any[]) => {
      this.dataSource.data = items;
      console.log('________');

      console.log({ items });
    });
  }
  //
  columns2: any = [
    // {
    //   header: this.translate.stream('table_kitchen_sink.africa'),
    //   field: 'africa',
    //   sortable: true,
    //   minWidth: 100,
    //   width: '100px',
    // },
    {
      header: this.translate.stream('table_kitchen_sink.category'),
      field: 'category',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.countryOfPartnerInstitution'),
      field: 'countryOfPartnerInstitution',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.durationOfMoU'),
      field: 'durationOfMoU',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.expiryDate'),
      field: 'expiryDate',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.highlights'),
      field: 'highlights',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.nameOfPartnerInstitution2'),
      field: 'nameOfPartnerInstitution2',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.partnerSignitory'),
      field: 'partnerSignitory',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.purposeOfTheMoU'),
      field: 'purposeOfTheMoU',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsiblePartnerDepartment'),
      field: 'responsiblePartnerDepartment',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsiblePartnerOfficiaEmail'),
      field: 'responsiblePartnerOfficiaEmail',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsiblePatnerFaculty'),
      field: 'responsiblePatnerFaculty',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsiblePatnerOfficiaTell'),
      field: 'responsiblePatnerOfficiaTell',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsiblePatnerOfficial'),
      field: 'responsiblePatnerOfficial',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsibleTUTDepartment'),
      field: 'responsibleTUTDepartment',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsibleTUTFaculty'),
      field: 'responsibleTUTFaculty',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsibleTUTOfficiaEmail'),
      field: 'responsibleTUTOfficiaEmail',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsibleTUTOfficiaTell'),
      field: 'responsibleTUTOfficiaTell',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.startDate'),
      field: 'startDate',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsibleTUTOfficial'),
      field: 'responsibleTUTOfficial',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.status'),
      field: 'status',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.tUTSigantory'),
      field: 'tUTSigantory',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
  ];

  columns3: any = [
    {
      header: this.translate.stream('table_kitchen_sink.africa'),
      field: 'africa',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.country'),
      field: 'country',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Name of Partner Institution'),
      field: 'partnerInstitution',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.category'),
      field: 'category',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Purpose of the MoU'),
      field: 'purposeOfTheMoU',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Status'),
      field: 'status',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Highlight'),
      field: 'highlights',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Duration of  MoU'),
      field: 'durationOfMoU',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Start date'),
      field: 'startDate',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Expiry date'),
      field: 'expiryDate',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Responsible TUT Faculty'),
      field: 'responsibleTutFaculty',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Responsible TUT  Department'),
      field: 'responsibleTutDepartment',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Responsible TUT  Official'),
      field: 'responsibleTutOfficial',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Responsible TUT  Telephone'),
      field: 'responsibleTutTelephone',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Responsible TUT  Official Telephone'),
      field: 'responsibleTutOfficialTelephone',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Responsible TUT  Official Email'),
      field: 'responsibleTutOfficialEmail',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Responsible TUT  Official Email'),
      field: 'responsibleTutOfficialEmail',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Responsible Partner Faculty'),
      field: 'responsiblePartnerFaculty',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Responsible Partner  Department'),
      field: 'responsiblePartnerDepartment',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Responsible Partner  Official'),
      field: 'responsiblePartnerOfficial',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.position'),
      field: 'responsiblePartnerOfficialTelephone',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Responsible Partner Official Email'),
      field: 'responsiblePartnerOfficialEmail',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.Partner Signitory'),
      field: 'partnerSignatory',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.TUT Signatory'),
      field: 'tutSignatory',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.MOU PDF'),
      field: 'mouPdf',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
  ];
  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('table_kitchen_sink.position'),
      field: 'position',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.name'),
      field: 'name',
      sortable: true,
      disabled: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.weight'),
      field: 'weight',
      minWidth: 100,
    },
    {
      header: this.translate.stream('table_kitchen_sink.symbol'),
      field: 'symbol',
      minWidth: 100,
    },
    {
      header: this.translate.stream('table_kitchen_sink.gender'),
      field: 'gender',
      minWidth: 100,
    },
    {
      header: this.translate.stream('table_kitchen_sink.mobile'),
      field: 'mobile',
      hide: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('table_kitchen_sink.tele'),
      field: 'tele',
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.birthday'),
      field: 'birthday',
      minWidth: 180,
    },
    {
      header: this.translate.stream('table_kitchen_sink.city'),
      field: 'city',
      minWidth: 120,
    },
    {
      header: this.translate.stream('table_kitchen_sink.address'),
      field: 'address',
      minWidth: 180,
      width: '200px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.company'),
      field: 'company',
      minWidth: 120,
    },
    {
      header: this.translate.stream('table_kitchen_sink.website'),
      field: 'website',
      minWidth: 180,
    },
    {
      header: this.translate.stream('table_kitchen_sink.email'),
      field: 'email',
      minWidth: 180,
    },
    {
      header: this.translate.stream('table_kitchen_sink.operation'),
      field: 'operation',
      minWidth: 140,
      width: '140px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translate.stream('table_kitchen_sink.edit'),
          click: record => this.edit(record),
        },
        {
          type: 'icon',
          color: 'warn',
          icon: 'delete',
          tooltip: this.translate.stream('table_kitchen_sink.delete'),
          pop: {
            title: this.translate.stream('table_kitchen_sink.confirm_delete'),
            closeText: this.translate.stream('table_kitchen_sink.close'),
            okText: this.translate.stream('table_kitchen_sink.ok'),
          },
          click: record => this.delete(record),
        },
      ],
    },
  ];
  list: any[] = [];
  isLoading = true;

  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnSortable = true;
  columnPinnable = true;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;

  ngOnInit() {
    this.list = this.dataSrv.getData();
    this.isLoading = false;
  }

  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(TablesKitchenSinkEditComponent, {
      width: '600px',
      data: { record: value },
    });

    dialogRef.afterClosed().subscribe(() => console.log('The dialog was closed'));
  }

  delete(value: any) {
    this.dialog.alert(`You have deleted ${value.position}!`);
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  enableRowExpandable() {
    this.columns[0].showExpand = this.expandable;
  }

  updateCell() {
    this.list = this.list.map(item => {
      item.weight = Math.round(Math.random() * 1000) / 100;
      return item;
    });
  }

  updateList() {
    this.list = this.list.splice(-1).concat(this.list);
  }

  navigateToForm() {
    this.router.navigate(['/forms/dynamic']);
  }
}
