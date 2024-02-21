import { create, test, enforce } from 'vest';
import { i18n } from "@/plugins/i18n";

export const deviceFormSuite = create((data: Device) => {
    const t  = i18n.global.t;

    test('hostname', t('Hostname should not be blank.'), () => {
        enforce(data.hostname).isNotBlank();
    });

    test('device_type', t('Device type should not be blank.'), () => {
        enforce(data.device_type).isNotBlank();
    });

    test('device_type', t('Invalid combination operation system and device.'), () => {
        if (data.os_type === 'iOS' || data.os_type === 'android') {
            enforce(data.device_type).inside(['mobile']);
        } else if (data.os_type !== 'win') {
            enforce(data.device_type).inside(['pc', 'laptop']);
        }
    });

    test('os_type', t('OS Type should not be blank.'), () => {
        enforce(data.os_type).isNotBlank();
    });

    test('os_type', t('Invalid combination operation system and device.'), () => {
        if (data.device_type === 'mobile') {
            enforce(data.os_type).inside(['iOS', 'android', 'win']);
        } else {
            enforce(data.os_type).inside(['win', 'lin', 'macOS']);
        }
    });
    test('owner_name', t('Owner name should not be blank.'), () => {
        enforce(data.owner_name).isNotBlank();
    });
});