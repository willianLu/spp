import Env from "@/env";
import Config from "@/config";

// 开发环境代理key处理
export const devProxy: Record<string, string> = {
  [Config.domain.gs]: "/gs-api",
  [Config.domain.qt]: "/qt-api",
  [Config.domain.tc]: "/tc-api",
};

// 公共参数，所有域名都支持
export const commonParams: any = {
  traceId: Env.traceId,
};

// 多域名参数配置
export const domainParams: any = {
  [Config.domain.gs]: {
    domain: "gs",
  },
  [Config.domain.qt]: {
    flag: "qt",
  },
  [Config.domain.tc]: function () {
    return {
      domain: "tc",
      name: "tc-qiang",
    };
  },
};

// 公共response返回处理
export const commonResponse = (response: any) => {
  const data = response.data;
  if (data) response.data.test = "公共返回处理";
  return response;
};

// 多域名response返回处理
export const domainResponse: Record<string, (response: any) => void> = {
  [Config.domain.gs]: function (response) {
    const data = response.data;
    if (data) {
      response.data.gs = "gs处理";
    }
    return response;
  },
  [Config.domain.qt]: function (response) {
    if (response.data) {
      response.data.qt = "qt处理";
    }
  },
  [Config.domain.tc]: function (response) {
    const data = response.data;
    const error = new Error();
    if (data.code === 401) {
      error.message = data.message;
      error.name = data.code;
      return Promise.reject(error);
    }
    response.data.tc = "tc处理";
    return response;
  },
};
