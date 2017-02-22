﻿namespace Tccc {
    export class TalkService {

        static $inject = ["apiService"];

        constructor(private apiService: ApiService) {
        }

        get(talkId: string): ng.IPromise<Talk> {
            var args = { talkId: talkId };
            var selector = (t: Server.Talk) => new Talk(t);
            return this.apiService.query("/talks/get", args, selector);
        }

        getTalks(eventId: string): ng.IPromise<Talk[]> {
            var args = { eventId: eventId };
            var selector = (talks: Server.Talk[]) => talks.map(t => new Talk(t));
            return this.apiService.query("/talks/getTalksForEvent", args, selector);
        }

        submitTalk(talk: Server.TalkSubmission): ng.IPromise<Server.TalkSubmission> {
            return this.apiService.post("/talks/submit", talk);
        }

        getSubmissions(): ng.IPromise<Server.TalkSubmission[]> {
            return this.apiService.query("/talks/getSubmissions");
        }

        getMySubmissions(): ng.IPromise<Server.TalkSubmission[]> {
            return this.apiService.query("/talks/getMySubmissions");
        }
    }

    App.service("talkApi", TalkService);
}