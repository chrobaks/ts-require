
class UserQueryMod implements IClassUserQuery
{
    public insertQuery = (args:{[key:string]:string}) :IUserInsertQuery =>
    {
        return {
            "act": "setProtime",
            "path": args.path,
            "json" : {
                "id"      : args.id,
                "project" : args.userProject,
                "start"   : args.start,
                "end"     : args.end,
                "time"    : args.time
            }
        };
    };

    public deleteQuery = (args:{[key:string]:string}) :IUserDeleteQuery =>
    {
        return {
            "act": "deleteProtime",
            "path": args.path,
            "json" : {"id" : args.id}
        };
    };
}

export const UserQuery = new UserQueryMod();