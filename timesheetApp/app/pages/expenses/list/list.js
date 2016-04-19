import {Page} from 'ionic-angular';
import {ORM, ORM_PROVIDERS} from './../../../services/db.models';

@Page({
    templateUrl: 'build/pages/expenses/list/list.html',
    directives: [],
    providers: [ORM_PROVIDERS]
})

export class ExpensesList {

    static get parameters() {
        return [[ORM]];
    }

    constructor(orm) {
        this.orm = orm;

        this.expenses = [];

        this.orm.getExpenses().subscribe((records) => {
            records.forEach((rec) => {
                rec.date = new Date(rec.date);
            });
            this.expenses = records;
        });
    }
}
