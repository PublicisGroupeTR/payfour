package com.carrefour.payfour.data.models
import com.google.gson.annotations.SerializedName

data class AddressRegistrationModel(
    @SerializedName("AddressType")
    var addressType: String? = null,

    @SerializedName("District")
    var district: String? = null,

    @SerializedName("DistrictCode")
    var districtCode: Int? = null,

    @SerializedName("Street")
    var street: String? = null,

    @SerializedName("StreetCode")
    var streetCode: Int? = null,

    @SerializedName("VillageCode")
    var villageCode: Int? = null,

    @SerializedName("AddressDetail")
    var addressDetail: String? = null,

    @SerializedName("TownCode")
    var townCode: Int? = null,

    @SerializedName("Town")
    var town: String? = null,

    @SerializedName("City")
    var city: String? = null,

    @SerializedName("CityCode")
    var cityCode: Int? = null,

    @SerializedName("Country")
    var country: String? = null,

    @SerializedName("CountryCode")
    var countryCode: Int? = null
)
