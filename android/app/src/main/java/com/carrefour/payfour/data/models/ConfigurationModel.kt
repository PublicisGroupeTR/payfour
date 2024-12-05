package com.carrefour.payfour.data.models

data class ConfigurationModel(
    val title: String,
    val apiServerUser: String,
    val domainName: String,
    val aiCertificateName: String,
    val aiSslPinningRequired: Boolean,
    val backOfficeCertificateName: String,
    val backOfficeSslPinningRequired: Boolean,
    val aiUsername: String,
    val aiPassword: String,
    val signalServer: String,
    val stunServer: String,
    val turnServer: String,
    val turnServerUser: String,
    val turnServerKey: String,
    val apiServer: String,
    val msPrivateKey: String,
    val isMediaServerEnabled: Boolean
)