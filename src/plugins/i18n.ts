import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
    locale: 'cs',
    legacy: false,
    globalInjection: true,
    messages: {
        cs: {
            'devices-storage': 'Seznam zařízení',
            'hostname': 'Název hostitele',
            'device-type': 'Typ zařízení',
            'os-type': 'Typ OS',
            'owner': 'Vlastník',
            'add': 'Přidej',
            'add-device': 'Přidat zařízení',
            'save': 'Uložit',
            'device-added-successfully': 'Zařízení bylo úspěšně přidáno.',
            'Invalid combination operation system and device.': 'Špatná kombinace operačního systému a zařízení.',
            'Hostname should not be blank.': 'Název hostitele nesmí být prázdný',
            'Device type should not be blank.': 'Typ zařízení nesmí být prázdný',
            'OS Type should not be blank.': 'Typ OS nesmí být prázdný',
            'Owner name should not be blank.': 'Vlastník nesmí být prázdný',
        }
    }
})