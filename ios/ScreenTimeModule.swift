import Foundation
import React
import DeviceActivity
import FamilyControls

@objc(ScreenTimeModule)
class ScreenTimeModule: NSObject {

  // MARK: - Prośba o dostęp
  @objc
  func requestAccess(_ resolve: @escaping RCTPromiseResolveBlock,
                     rejecter reject: @escaping RCTPromiseRejectBlock) {
    resolve(true) // mock: zawsze true
  }

  // MARK: - Czas dzisiaj
  @objc
  func getTikTokTime(_ resolve: @escaping RCTPromiseResolveBlock,
                     rejecter reject: @escaping RCTPromiseRejectBlock) {
    let minutesToday = 42 // mock
    resolve(minutesToday)
  }

  // MARK: - Czas wczoraj
  @objc
  func getTikTokTimeYesterday(_ resolve: @escaping RCTPromiseResolveBlock,
                              rejecter reject: @escaping RCTPromiseRejectBlock) {
    let minutesYesterday = 50 // mock
    resolve(minutesYesterday)
  }

  // MARK: - Suma minut z ostatniego tygodnia
  @objc
  func getWeeklyTotal(_ resolve: @escaping RCTPromiseResolveBlock,
                      rejecter reject: @escaping RCTPromiseRejectBlock) {
    // mock: suma minut z 7 dni
    let weekMinutes = [30, 45, 50, 60, 20, 10, 42]
    let total = weekMinutes.reduce(0, +)
    resolve(total)
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

//
//  ScreenTimeModule.swift
//  fcktiktok
//
//  Created by Milosz Zajdel on 29/08/2025.
//

