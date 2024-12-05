package com.carrefour.payfour.utils

import com.carrefour.payfour.data.enums.Environment
import com.carrefour.payfour.data.models.ConfigurationModel

object Constants {
    private val ENVIRONMENT = Environment.TEST


    fun getEnQualifyConfigurationData(): ConfigurationModel =
        when(ENVIRONMENT){
            Environment.TEST -> {
                ConfigurationModel(
                    "Enqura",
                    "mobile",
                    "enverifyai-uat.dgfinansman.com",
                    "dgfinansman",
                    true,
                    "dgfinansman",
                    true,
                    "demo",
                    "idverify",
                    "enverifyai-uat.dgfinansman:1794",
                    "stun:enverifyai-uat.dgfinansman:3478",
                    "turn:enverifyai-uat.dgfinansman:3478",
                    "smartuser",
                    "Sv2017_1697turn",
                    "https://enverifymapip-uat.dgfinansman.com",
                    "1234567890123456789012345678901234567890",
                    false
                )
            }
            else -> {
                ConfigurationModel(
                    "Enqura",
                    "mobile",
                    "enverifyai-uat.dgfinansman.com",
                    "dgfinansman",
                    true,
                    "dgfinansman",
                    true,
                    "demo",
                    "idverify",
                    "enverifyai-uat.dgfinansman:1794",
                    "stun:enverifyai-uat.dgfinansman:3478",
                    "turn:enverifyai-uat.dgfinansman:3478",
                    "smartuser",
                    "Sv2017_1697turn",
                    "https://enverifymapip-uat.dgfinansman.com",
                    "1234567890123456789012345678901234567890",
                    false
                )
            }
        }
}