// frida -U -l network-security-config-bypass.js --no-pause -f com.example.bypassnsc 
Java.perform(function(){
    NetworkSecurityConfig_Builder =Java.use("android.security.net.config.NetworkSecurityConfig$Builder");
	console.log("NetworkSecurityConfig_Builder: " + NetworkSecurityConfig_Builder);
    CertificatesEntryRef = Java.use("android.security.net.config.CertificatesEntryRef");
	console.log("CertificatesEntryRef: " + CertificatesEntryRef);
    CertificateSource = Java.use("android.security.net.config.CertificateSource");
	console.log("CertificateSource: " + CertificateSource);
    UserCertificateSource = Java.use("android.security.net.config.UserCertificateSource");
	console.log("UserCertificateSource: " + UserCertificateSource);

    NetworkSecurityConfig_Builder.getEffectiveCertificatesEntryRefs.implementation = function(){
	console.log("entra");
        origin = this.getEffectiveCertificatesEntryRefs()
        
        source = UserCertificateSource.getInstance()
        userCert = CertificatesEntryRef.$new(source,true)
        origin.add(userCert)

	return origin
    }
})
