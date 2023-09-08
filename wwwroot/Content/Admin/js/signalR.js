////var connection = new signalR.HubConnectionBuilder().withUrl("/WebsiteHub/Message").configureLogging(signalR.LogLevel.Information).build();
////connection.start().catch(err => console.error(err.toString()));
////connection.on("ReceiveNotificationMember", (message) => {
////    loadNotificationCount();
////    var type = $("#roleType").val();
////    var userId = $("#userId").val();

////    if (type == "Admin" && message.roleAdmin) {
////        notifyChrome({ title: message.displayName, icon: "/content/Home/images/logo.png", body: message.name, url: message.redirectTo })
////    }
////    if (type == "Member" && !message.roleAdmin && message.toUserId == userId) {
////        notifyChrome({ title: message.displayName, icon: "/content/Home/images/logo.png", body: message.name, url: message.redirectTo })
////    }

////});
////loadNotificationCount();
////function loadNotification() {
////    $.get("/Notifications", function (data) {
////        var str = "";
////        for (i = 0; i < data.length; i++) {
////            str +=
////                `
////                                        <li>
////                                            <a href="`+ data[i].redirectTo + `" class=' waves-effect waves-block'>
////                                                <div class="menu-info">
////                                                    <h3>From: `+ data[i].fromDisplayName + `<span class='cannutdaxem'> <input onchange='notificationChangeStatus(` + data[i].id + `,this)' type="checkbox" ` + (data[i].seen ? "checked" : "") + ` id="Status_` + data[i].id + `" class="filled-in chk-col-green" /><label for="Status_` + data[i].id + `"> </label></span> </h3>
////                                                    <h4>` + data[i].name + `</h4>
                                                    
////                                                </div>
////                                            </a>
////                                        </li>
////            `;
////        }
////        $("#notificationsList").html(str);
////    });
////}

////$(document).on('click', '#dropdown-menu-no', function (e) {
////    e.stopPropagation();
////});

////function loadNotificationCount() {
////    $.get("/NotificationsCount", function (data) {
////        $("#notificationsCount").html(data);
////    });
////}
////function notificationChangeStatus(id, e) {
////    $.post("/NotificationChangeStatus", { id, val: $(e).prop("checked") }, function (data) {
////        if (data == 1) {
////            loadNotificationCount();
////        }
////    });
////}


//////function requestPermission() {
//////    return new Promise(function (resolve, reject) {
//////        const permissionResult = Notification.requestPermission(function (result) {
//////            // Xử lý phiên bản cũ với callback.
//////            resolve(result);
//////        });

//////        if (permissionResult) {
//////            permissionResult.then(resolve, reject);
//////        }
//////    })
//////        .then(function (permissionResult) {
//////            if (permissionResult !== 'granted') {
//////                throw new Error('Permission not granted.');
//////            }
//////        });
//////}

//////function subscribeUserToPush() {
//////    return navigator.serviceWorker.register('service-worker.js')
//////        .then(function (registration) {
//////            var subscribeOptions = {
//////                userVisibleOnly: true,
//////                applicationServerKey: btoa(
//////                    'BFSFi9uWgYpC8W37299apE4QnwiFC1R4Z9Lpy_Q9xV3pSvSw5SPA3hd4HCPnfOXaMYofanRDvNROIH0CDTITD6Y'
//////                )
//////            };

//////            return registration.pushManager.subscribe(subscribeOptions);
//////        })
//////        .then(function (pushSubscription) {
//////            console.log('PushSubscription: ', JSON.stringify(pushSubscription));
//////            return pushSubscription;
//////        });
//////}

////// request permission on page load
////document.addEventListener('DOMContentLoaded', function () {
////    if (!Notification) {
////        alert('Máy tính chưa cài trình duyệt chrome.');
////        return;
////    }

////    if (Notification.permission !== "granted")
////        Notification.requestPermission();
////});

////function requestPermission() {
////    if (Notification.permission !== "granted")
////        Notification.requestPermission();
////}

////function notifyChrome(data) {
////    if (Notification.permission !== "granted")
////        Notification.requestPermission();
////    else {
////        var notification = new Notification(data.title, {
////            icon: data.icon,
////            body: data.body,
////        });

////        notification.onclick = function () {
////            window.open(data.url);
////        };
////    }
////}