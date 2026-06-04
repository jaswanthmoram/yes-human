import { useState, useCallback, useMemo } from "react";
import { Router, RouterConfig, RouteResult } from "@yes-human/core";

export function useYesRouter(config: RouterConfig = {}) {
  const router = useMemo(() => new Router(config), [config]);
  const [result, setResult] = useState<RouteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const route = useCallback(async (input: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await router.route(input);
      setResult(res);
      return res;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [router]);

  return {
    router,
    route,
    result,
    loading,
    error,
  };
}
