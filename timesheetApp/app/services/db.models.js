import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Database} from './db.sqlite';

@Injectable()
export class ORM {
    static get parameters() {
        return [[Database]];
    }

    constructor(database) {
        this.db = database;
        this.schema = "json_data";
    }

    init() {
        this.db.create(this.schema, { "model": "text primary key not null", "records": "text" });
    }

    get(modelName) {
        return Observable.create(observer => {
            this.db.fetch("select * from " + this.schema + " where model='" + modelName + "'", true).subscribe((data) => {
                if (data.length > 0 && data[0].records) {
                    let records = JSON.parse(data[0].records);

                    observer.next(records);
                    observer.complete();
                }
            });
        });
    }

    set(modelName, records) {
        this.db.add(this.schema, { model: modelName, records: JSON.stringify(records) });
    }

    getProjects() {
        return this.get('projects');
    }

    setProjects(records) {
        this.set('projects', records);
    }

    getActivities() {
        return this.get('activities');
    }

    setActivities(records) {
        this.set('activities', records);
    }

    getTasks() {
        return this.get('tasks');
    }

    setTasks(records) {
        this.set('tasks', records);
    }

    getStatistics() {
        return this.get('statistics');
    }

    setStatistics(records) {
        this.set('statistics', records);
    }

    getDraftTasks() {
        return this.get('draft-tasks');
    }

    setDraftTasks(records) {
        this.set('draft-tasks', records);
    }

    getExpenses() {
        return this.get('expenses');
    }

    setExpenses(records) {
        this.set('expenses', records);
    }

    getKMExpenses() {
        return this.get('km-expenses');
    }
    
    setKMExpenses(records) {
        this.set('km-expenses',records);
    }

    getLeaveRequests() {
        return this.get('leave-requests');
    }
    
    setLeaveRequests(records) {
        this.set('leave-requests', records);
    }
}

export var ORM_PROVIDERS = [ORM, Database];
