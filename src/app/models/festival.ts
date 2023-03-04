  import { Optional } from "@angular/core";

export class Festival {

    static sqmTable = 6;

    public id?: string;
    public editeurs: string[];
    public name: string;
    public tablemax_1: number;
    public tableprice_1: number;
    public sqmprice_1: number;
    public tablebooked_1: number = 0;
    public sqmbooked_1: number = 0;
    public tablemax_2: number;
    public tableprice_2: number;
    public sqmprice_2: number;
    public tablebooked_2: number = 0;
    public sqmbooked_2: number = 0;
    public tablemax_3: number;
    public tableprice_3: number;
    public sqmprice_3: number;
    public tablebooked_3: number = 0;
    public sqmbooked_3: number = 0;
    public revenue: number = 0;
    public visitor: boolean = false;

    public get tableTotal() : number { return this.tablemax_1 + this.tablemax_2 + this.tablemax_3; }

    public constructor(
       name: string,
       @Optional() id?: string,
       @Optional() editeurs?: string[],
       @Optional() entranceLoc: number = 64,  // première partie de salle
       @Optional() mainRoomLoc: number = 72,   // deuxième partie de salle
       @Optional() cafetLoc: number = 40, // étage de la buvette
       @Optional() entrancePrice: number = 110,
       @Optional() mainRoomPrice: number = 100,
       @Optional() cafetPrice : number = 90,
       @Optional() entranceSqm?: number,
       @Optional() mainRoomSqm?: number,
       @Optional() cafetSqm?: number,
       @Optional() entranceTableBooked : number = 0,
       @Optional() mainRoomTableBooked : number = 0,
       @Optional() cafetTableBooked : number = 0,
       @Optional() entranceSqmBooked : number = 0,
       @Optional() mainRoomSqmBooked : number = 0,
       @Optional() cafetSqmBooked : number = 0,
       @Optional() revenue: number = 0,
       @Optional() visitor: boolean = false
    ){
       this.editeurs = editeurs ? editeurs : [];
       this.name = name;
       this.id = id;
       this.tablemax_1 = entranceLoc;
       this.tablemax_2 = mainRoomLoc;
       this.tablemax_3 = cafetLoc;
       this.tableprice_1 = entrancePrice;
       this.tableprice_2 = mainRoomPrice;
       this.tableprice_3 = cafetPrice;
       this.sqmprice_1 = (entranceSqm == null) ? Math.round((this.tableprice_1 / Festival.sqmTable) * 10) / 10 : entranceSqm;
       this.sqmprice_2 = (mainRoomSqm == null) ? Math.round((this.tableprice_2 / Festival.sqmTable) * 10) / 10 : mainRoomSqm;
       this.sqmprice_3 = (cafetSqm == null) ? Math.round((this.tableprice_3 / Festival.sqmTable) * 10) / 10 : cafetSqm;
       this.tablebooked_1 = entranceTableBooked;
       this.tablebooked_2 = mainRoomTableBooked;
       this.tablebooked_3 = cafetTableBooked;
       this.sqmbooked_1 = entranceSqmBooked;
       this.sqmbooked_2 =  mainRoomSqmBooked;
       this.sqmbooked_3 = cafetSqmBooked;
       this.revenue = revenue;
       this.visitor = visitor
    }

}
