import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'project',
    templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit {
    @ViewChild('multiSelect') multiSelect;
    public form: FormGroup;
    public loadContent: boolean = false;
    public name = 'Cricketers';
    public data = [];
    public settings = {};
    public selectedItems = [];

    ngOnInit() {
        this.data = [
            { item_id: 1, item_text: 'Hanoi' },
            { item_id: 2, item_text: 'Lang Son' },
            { item_id: 3, item_text: 'Vung Tau' },
            { item_id: 4, item_text: 'Hue' },
            { item_id: 5, item_text: 'Cu Chi' },
        ];
        console.log(this.data);
        // setting and support i18n
        this.settings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            enableCheckAll: true,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            allowSearchFilter: true,
            limitSelection: -1,
            clearSearchFilter: true,
            maxHeight: 197,
            itemsShowLimit: 3,
            searchPlaceholderText: 'Enter Shop Type',
            noDataAvailablePlaceholderText: 'No Data Available',
            closeDropDownOnSelection: false,
            showSelectedItemsAtTop: false,
            defaultOpen: false,
        };
        this.setForm();
    }

    public setForm() {
        this.form = new FormGroup({
            name: new FormControl(this.data, Validators.required),
        });
        this.loadContent = true;
    }

    get f() {
        return this.form.controls;
    }

    public save() {
        console.log(this.form.value);
    }

    public resetForm() {
        // beacuse i need select all crickter by default when i click on reset button.
        this.setForm();
        this.multiSelect.toggleSelectAll();
        // i try below variable isAllItemsSelected reference from your  repository but still not working
        // this.multiSelect.isAllItemsSelected = true;
    }

    public onFilterChange(item: any) {
        console.log(item);
    }
    public onDropDownClose(item: any) {
        console.log(item);
    }

    public onItemSelect(item: any) {
        console.log(item);
    }
    public onDeSelect(item: any) {
        console.log(item);
    }

    public onSelectAll(items: any) {
        console.log(items);
    }
    public onDeSelectAll(items: any) {
        console.log(items);
    }
}
