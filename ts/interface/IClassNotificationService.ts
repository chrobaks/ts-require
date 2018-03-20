
interface INotificationCache {
    [key:string] : any
}
interface IClassNotificationService_Set {
    (namespace:string, callback:any) :void
}
interface IClassNotificationService_Exec {
    (namespace:string, args:any) :void
}

interface IClassNotificationService {
    set  : IClassNotificationService_Set;
    exec : IClassNotificationService_Exec;
}