package com.carrefour.payfour.data.models
import com.google.gson.annotations.SerializedName

data class IDRegistrationModel(
    @SerializedName("FatherName")
    var fatherName: String? = null,

    @SerializedName("MotherName")
    var motherName: String? = null,

    @SerializedName("BirthPlace")
    var birthPlace: String? = null,

    @SerializedName("RegistrationPlace")
    var registrationPlace: String? = null,

    @SerializedName("RegistrationPlaceFamilyRow")
    var registrationPlaceFamilyRow: String? = null,

    @SerializedName("RegistrationPlacePersonalRow")
    var registrationPlacePersonalRow: String? = null,

    @SerializedName("SerialNo")
    var serialNo: String? = null,

    @SerializedName("RecordNo")
    var recordNo: String? = null,

    @SerializedName("IdentityType")
    var identityType: String? = null,

    @SerializedName("IdentityNo")
    var identityNo: String? = null,

    @SerializedName("DocumentNo")
    var documentNo: String? = null,

    @SerializedName("Name")
    var name: String? = null,

    @SerializedName("Surname")
    var surname: String? = null,

    @SerializedName("Gender")
    var gender: String? = null,

    @SerializedName("BirthDate")
    var birthDate: String? = null,

    @SerializedName("Nationality")
    var nationality: String? = null,

    @SerializedName("IssuedBy")
    var issuedBy: String? = null,

    @SerializedName("IssuedDate")
    var issuedDate: String? = null,

    @SerializedName("ExpireDate")
    var expireDate: String? = null
)
