export interface Notification {
    id: string;
    icon?: string;
    image?: string;
    title?: string;
    description?: string;
    time: string;
    link?: string;
    useRouter?: boolean;
    read: boolean;
    NotificationID: string;
    NotificationTitle?: string;
    NotificationContent?: string;
    NotificationRedirect?: string;
    CreatedDateTime: string;
    NotiRID: string;
    IsRead: boolean;
    Iscomplete: boolean;
}
