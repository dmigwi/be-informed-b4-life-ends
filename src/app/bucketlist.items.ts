// THis classes help to ensure data comes in the format that we expect.

export class BucketList{
	id: number;
	name: string;
	date_created: string;
    date_modified: string;
    item:  any[];
    created_by: string;
}


export class Item{
	id: number;
	name: string;
	date_created: string;
    date_modified: string;
    bucketlist: number;
    done: boolean;
}