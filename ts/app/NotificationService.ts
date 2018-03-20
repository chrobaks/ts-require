
class NotificationService implements IClassNotificationService
{
    private static _instance : NotificationService;
    private notificationCache : INotificationCache;

    private constructor ()
    {
        this.notificationCache = {};
    }

    public static get Instance() { return this._instance || (this._instance = new this()); }

    public set = (namespace:string, callback:any) :void =>
    {
        this.notificationCache[namespace] = callback;
    };
    public exec = (namespace:string, args:any) :void =>
    {
        if (this.notificationCache.hasOwnProperty(namespace)) {
            this.notificationCache[namespace](args);
        }
    };
}

const AppNotification = NotificationService.Instance;

export { AppNotification };