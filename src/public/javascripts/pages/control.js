import FeaturesComponent from '../components/features-component.js';
import SelectComponent from '../components/select-component.js';
import { businessFeatures, plusFeatures, scaleFeatures } from '../components/features.js';
import { businessOptions, scaleOptions } from '../components/selections.js';

window.onload = function () {
    new SelectComponent(businessOptions, 'business');
    new SelectComponent(scaleOptions, 'scale');
    new FeaturesComponent(plusFeatures, 'plus');
    new FeaturesComponent(businessFeatures, 'business');
    new FeaturesComponent(scaleFeatures, 'scale');
};
