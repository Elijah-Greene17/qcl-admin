package com.putnampuzzleadmin;  // Replace with your package name

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        // Handle incoming messages here.
    }

    @Override
    public void onNewToken(String token) {
        super.onNewToken(token);
        // Handle token refresh here.
    }
}
