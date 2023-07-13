import path from 'node:path';

export const pagePaths = {
    CONTROL: path.join(__dirname + '/../pages/pricing/control.html'),
    VARIANT: path.join(__dirname + '/../pages/pricing/variant1.html'),
};

export enum PageTypes {
    CONTROL = 'CONTROL',
    VARIANT = 'VARIANT',
}
