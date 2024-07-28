export type RequestMethod = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";

export type ProxyConfig = {
    country?: string;
    protocol: string;
    host: string;
    port: number;
    auth?: {
        username: string;
        password: string;
    }
}
