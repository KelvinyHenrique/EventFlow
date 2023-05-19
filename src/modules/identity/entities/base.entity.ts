export class BaseEntity {
    setProperties(props: any, omittedProperties: Array<keyof any>) {
        const keys = Object.keys(props);
        const values = Object.values(props);
        keys.forEach((key, index) => {
            // Ignore ommited properties
            if (omittedProperties.includes(key as keyof any)) return;

            // Set the property
            this[key] = values[index];
        });
    }
}