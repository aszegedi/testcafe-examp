/// <reference types="node" />

export const BASE_URL = process.env.BASE_URL || 'https://192.168.99.100';
export const USERNAME = process.env.USERNAME || 'admin@example.com';
export const PASSWORD = process.env.PASSWORD || 'cloudbreak';
export const OS_USERNAME = process.env.OS_USERNAME || 'cloudbreak';
export const OS_PASSWORD = process.env.OS_PASSWORD || 'cloudbreak';
export const OS_TENANT_NAME = process.env.OS_TENANT_NAME || 'cloudbreak';
export const OS_ENDPOINT = process.env.OS_ENDPOINT || 'http://openstack.hortonworks.com:1000/v2.0';
export const OS_APIFACING = process.env.OS_APIFACING || 'internal';
export const AMBARI_USER = process.env.AMBARI_USER || 'admin';
export const AMBARI_PASSWORD = process.env.AMBARI_PASSWORD || 'admin123!@#';
export const SSH_KEY_NAME = process.env.SSH_KEY_NAME || 'seq-master';
