import {Injectable} from '@angular/core';
import {CommentModel, PostModel} from "../models/common.model";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private tmpData: PostModel[] = [
        {
            id: "111",
            user: {
                username: "VolumeCore",
                avatarSrc: "https://sun9-20.userapi.com/impg/AwDJtQwEGsPuAPNIzklQPe43_OHVCjxqmi9roQ/eIMUwegjufo.jpg?size=1440x1800&quality=95&sign=1df94f38ce4084f830eaf0f9c3d92a14&type=album"
            },
            date: "26-11-2022 11:05",
            postImageSrc: "https://sun9-17.userapi.com/impg/yHsqnHefEqiqmsAhD94T2sCFBTAfINh0y-OD7w/3VPgsIg8rFs.jpg?size=416x604&quality=95&sign=daf37958a4e55ab64c5045e570c5cc62&type=album",
            likesCount: 50,
            description: "Сегодня сделал фотку пока гулял",
            commentsCount: 4
        },
        {
            id: "222",
            user: {
                username: "VolumeCore",
                avatarSrc: "https://sun9-20.userapi.com/impg/AwDJtQwEGsPuAPNIzklQPe43_OHVCjxqmi9roQ/eIMUwegjufo.jpg?size=1440x1800&quality=95&sign=1df94f38ce4084f830eaf0f9c3d92a14&type=album"
            },
            date: "26-11-2022 11:05",
            postImageSrc: "https://sun9-28.userapi.com/impg/UCXKLoeXtjBzNc3fnI0okilZi058XV7VontqRg/UouybG5YMuY.jpg?size=640x640&quality=95&sign=df3fa9643a308ad0576345827403207a&type=album",
            likesCount: 50,
            description: "Ещё одна неплохая фоточка",
            commentsCount: 2
        },
        {
            id: "333",
            user: {
                username: "VolumeCore",
                avatarSrc: "https://sun9-20.userapi.com/impg/AwDJtQwEGsPuAPNIzklQPe43_OHVCjxqmi9roQ/eIMUwegjufo.jpg?size=1440x1800&quality=95&sign=1df94f38ce4084f830eaf0f9c3d92a14&type=album"
            },
            date: "26-11-2022 11:05",
            postImageSrc: "https://sun9-42.userapi.com/impg/Ho7qew4AIoWjI8D793C2UpH5eHhd08KlvnzYng/_3ZnSmeEkZI.jpg?size=759x767&quality=95&sign=f5956f9b4b9d4e3f9cb7e4f4f743b725&type=album",
            likesCount: 50,
            description: "Ещё одна неплохая фоточка",
            commentsCount: 2
        }
    ];

    private commentsData: CommentModel[] = [
        {
            user: {
                username: "VladaKhaustova",
                avatarSrc: "https://sun9-15.userapi.com/impg/PYpOxGh5DpSQNfSzfXcw2mxkfWu52p-yA_OVOg/RRXdjR3Lj1o.jpg?size=919x960&quality=96&sign=69726f8d07a43a82d971f5a9eb838bcd&type=album"
            },
            date: "26-11-2022 15:25",
            commentText: "Это в каком городе? Здание на фоне выглядит потрясающе!"
        },
        {
            user: {
                username: "SirlLizz",
                avatarSrc: "https://sun9-67.userapi.com/impg/AdMJUF5E3LX3b8D-zR5nPZBD6MiLcVmAb-_nzA/MqsOOaNXloo.jpg?size=1235x1233&quality=96&sign=665ba535de6a8643c9f1726a581d5a13&type=album"
            },
            date: "26-11-2022 17:21",
            commentText: "Свет отличный, мне нравится"
        },
        {
            user: {
                username: "Prafdin",
                avatarSrc: "https://sun9-28.userapi.com/impg/UCXKLoeXtjBzNc3fnI0okilZi058XV7VontqRg/UouybG5YMuY.jpg?size=640x640&quality=95&sign=df3fa9643a308ad0576345827403207a&type=album"
            },
            date: "26-11-2022 14:45",
            commentText: "Хороший пост, красивая фотография"
        },
        {
            user: {
                username: "PutiLove",
                avatarSrc: "https://sun9-41.userapi.com/impg/SSDfVCYycbUU-7a3EZgtWPzVqxm31FYTpDP-3g/Ut6_jf4xXew.jpg?size=453x447&quality=96&sign=e30132525f7d1c3f6b20a6609213f739&type=album"
            },
            date: "26-11-2022 14:57",
            commentText: "Пена в негре"
        },
        {
            user: {
                username: "VladaKhaustova",
                avatarSrc: "https://sun9-15.userapi.com/impg/PYpOxGh5DpSQNfSzfXcw2mxkfWu52p-yA_OVOg/RRXdjR3Lj1o.jpg?size=919x960&quality=96&sign=69726f8d07a43a82d971f5a9eb838bcd&type=album"
            },
            date: "26-11-2022 15:25",
            commentText: "У меня попугай на аватарке"
        },
        {
            user: {
                username: "SirlLizz",
                avatarSrc: "https://sun9-67.userapi.com/impg/AdMJUF5E3LX3b8D-zR5nPZBD6MiLcVmAb-_nzA/MqsOOaNXloo.jpg?size=1235x1233&quality=96&sign=665ba535de6a8643c9f1726a581d5a13&type=album"
            },
            date: "26-11-2022 17:21",
            commentText: "А у меня фиксик"
        }
    ];

    constructor() {
    }

    getPosts(): PostModel[] {
        return this.tmpData;
    }

    getComments(): CommentModel[] {
        return this.commentsData;
    }
}
