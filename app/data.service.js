"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var HttpDataService = (function () {
    function HttpDataService(_http) {
        this._http = _http;
        this.BaseURL = "http://localhost:8000/";
        this.loginUrl = this.BaseURL + "api/v1/auth/login";
        this.logoutUrl = this.BaseURL + "api/v1/auth/logout";
        this.registerUrl = this.BaseURL + "api/v1/auth/register";
        this.bucketlistURL = this.BaseURL + "api/v1/bucketlists";
        this.http = _http;
    }
    HttpDataService.prototype.userAuthentication = function (user, type) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = '';
        if (type == 'register') {
            url = this.registerUrl;
        }
        else {
            url = this.loginUrl;
        }
        return this.http.post(url, JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    HttpDataService.prototype.retrieveBucketLists = function (pageUrl) {
        if (pageUrl !== null) {
            // if pageUrl is not the null it is mad e the current Url
            this.bucketlistURL = pageUrl;
        }
        return this.http.get(this.bucketlistURL, { headers: this.GenerateHeaders() })
            .map(function (res) { return res.json(); });
    };
    HttpDataService.prototype.createBucketList = function (bucket) {
        return this.http.post(this.bucketlistURL, JSON.stringify(bucket), { headers: this.GenerateHeaders() })
            .map(function (res) { return res.json(); });
    };
    HttpDataService.prototype.EditBucketList = function (updatebucket, BucketId) {
        var url = this.bucketlistURL + '/' + BucketId;
        return this.http.put(url, JSON.stringify(updatebucket), { headers: this.GenerateHeaders() })
            .map(function (res) { return res.json(); });
    };
    HttpDataService.prototype.RetrieveSingleBucketList = function (BucketId) {
        var url = this.bucketlistURL + '/' + BucketId;
        return this.http.get(url, { headers: this.GenerateHeaders() })
            .map(function (res) { return res.json(); });
    };
    HttpDataService.prototype.DestroyBucketList = function (BucketId) {
        var url = this.bucketlistURL + '/' + BucketId;
        return this.http.delete(url, { headers: this.GenerateHeaders() })
            .map(function (res) { return res.json(); });
    };
    HttpDataService.prototype.CreateBucketListItem = function (newItem, BucketId) {
        var url = this.bucketlistURL + '/' + BucketId + '/item';
        return this.http.post(url, JSON.stringify(newItem), { headers: this.GenerateHeaders() })
            .map(function (res) { return res.json(); });
    };
    HttpDataService.prototype.EditBucketListItem = function (updateItem, BucketId, ItemId) {
        var url = this.bucketlistURL + '/' + BucketId + '/item/' + ItemId;
        return this.http.put(url, JSON.stringify(updateItem), { headers: this.GenerateHeaders() })
            .map(function (res) { return res.json(); });
    };
    HttpDataService.prototype.DestroyBucketListItem = function (BucketId, ItemId) {
        var url = this.bucketlistURL + '/' + BucketId + '/item/' + ItemId;
        return this.http.delete(url, { headers: this.GenerateHeaders() })
            .map(function (res) { return res.json(); });
    };
    HttpDataService.prototype.GenerateHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        return headers;
    };
    HttpDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HttpDataService);
    return HttpDataService;
}());
exports.HttpDataService = HttpDataService;
//# sourceMappingURL=data.service.js.map