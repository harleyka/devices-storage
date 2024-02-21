declare global {
    type DeviceType = 'pc' | 'laptop' | 'mobile';
    type OSType = 'win' | 'lin' | 'macOS' | 'iOS' | 'android';

    interface Device  {
        hostname: string
        device_type: DeviceType
        os_type: OSType
        owner: string
    }
}