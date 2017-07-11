package com.snoozelinks;

import android.util.Log;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.TaskStackBuilder;

import java.util.Calendar;


public class NotificationModule extends ReactContextBaseJavaModule {
    public NotificationModule (ReactApplicationContext context){
        super(context);
    }

    @Override
    public String getName() {
        return "Notification";
    }

    private void setAlarm(){
        AlarmManager alarmManager = (AlarmManager) getCurrentActivity().getSystemService(Context.ALARM_SERVICE);

        Intent notificationIntent = new Intent("android.media.action.DISPLAY_NOTIFICATION");
        notificationIntent.addCategory("android.intent.category.DEFAULT");

        PendingIntent broadcast = PendingIntent.getBroadcast(getCurrentActivity(), 100, notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.SECOND, 60);
        alarmManager.setExact(AlarmManager.RTC_WAKEUP, cal.getTimeInMillis(), broadcast);
    }

    @ReactMethod
    public void notification(){
        setAlarm();
        // Intent notificationIntent = new Intent(getCurrentActivity(), MainActivity.class);

        // TaskStackBuilder stackBuilder = TaskStackBuilder.create(getCurrentActivity());
        // stackBuilder.addParentStack(MainActivity.class);
        // stackBuilder.addNextIntent(notificationIntent);

        // PendingIntent pendingIntent = stackBuilder.getPendingIntent(0, PendingIntent.FLAG_UPDATE_CURRENT);

        // NotificationCompat.Builder builder = new NotificationCompat.Builder(getCurrentActivity());
        // Notification notification = builder.setContentTitle("Snooze App Notification")
        //         .setContentText("Snooze Links")
        //         .setTicker("Snooze")
        //         .setSmallIcon(R.mipmap.ic_launcher)
        //         .setContentIntent(pendingIntent).build();

        // NotificationManager notificationManager = (NotificationManager) getCurrentActivity().getSystemService(Context.NOTIFICATION_SERVICE);
        // notificationManager.notify(0, notification);
    }
}
