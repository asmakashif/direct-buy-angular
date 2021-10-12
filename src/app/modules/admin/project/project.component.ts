import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjectService } from 'app/modules/admin/project/project.service';

@Component({
    selector: 'project',
    templateUrl: './project.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent {
    db = [
        {
            id: '1',
            product_name: '6 Days at Karnataka',
            price: 324,
            duration: '6 days',
            category: ['Romance'],
        },
        {
            id: '5',
            product_name: '2 Days at Thailand',
            price: 234,
            duration: '2 days',
            category: ['Romance', 'Wild Life'],
        },
        {
            id: '8',
            product_name: '2 Days at Delhi',
            price: 1400,
            duration: '2 days',
            category: ['Romance', 'Food & Drink', 'Adventure'],
        },
    ];
    rangeValues: number[] = [0, 2000];
    durations: any = [];
    themes: any = [];
    package: any;
    filterData = [];
    constructor() {}

    ngOnInit() {
        this.packageList();
    }

    packageList() {
        for (let i = 0; i < this.db.length; i++) {
            this.filterData.push(this.db[i]);
            this.package = this.filterData;
            // console.log(this.package);
        }
    }

    handleChange() {
        this.ApplyFilters();
    }

    checkFilter(id) {
        if (this.durations.some((a) => a === id)) {
            this.durations = this.durations.filter((a) => a !== id);
        } else {
            this.durations.push(id);
        }
        this.ApplyFilters();
    }

    filterTheme(id) {
        if (this.themes.some((a) => a === id)) {
            this.themes = this.themes.filter((a) => a !== id);
        } else {
            this.themes.push(id);
        }
        this.ApplyFilters();
    }

    ApplyFilters() {
        this.package = this.filterData.filter((item) => {
            return (
                item.price >= this.rangeValues[0] &&
                item.price <= this.rangeValues[1] &&
                (this.durations.some((b) => b === item.duration) ||
                    this.durations.length === 0) &&
                (item.category.every((c) => this.themes.some((d) => d === c)) ||
                    this.themes.length === 0)
            );
        });
    }
}
