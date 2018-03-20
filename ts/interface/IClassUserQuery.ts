

interface IUserDeleteQueryJson {
    [key: string] : string;
    id : string;
}

interface IUserDeleteQuery {
    [key: string] : string|IUserDeleteQueryJson;
    act  : string;
    path : string;
    json : IUserDeleteQueryJson;
}

interface IUserQueryJson {
    [key: string] : string;
    id      : string;
    project : string;
    start   : string;
    end     : string;
    time    : string;
}


interface IUserInsertQuery {
    [key: string] : string|IUserQueryJson;
    act  : string;
    path : string;
    json : IUserQueryJson;
}

interface IClassUserQuery_InsertQuery {
    (args:{[key:string]:string}) :IUserInsertQuery
}
interface IClassUserQuery_DeleteQuery {
    (args:{[key:string]:string}) :IUserDeleteQuery
}
interface IClassUserQuery {
    insertQuery  : IClassUserQuery_InsertQuery;
    deleteQuery  : IClassUserQuery_DeleteQuery;
}