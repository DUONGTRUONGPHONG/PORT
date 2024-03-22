export default () => {
    /**
     * Retrieves the value associated with the specified key from the local storage.
     * @param key - The key of the value to retrieve.
     * @returns The value associated with the specified key, or null if the key does not exist.
     */
    function get(key: string): any {
        return localStorage.getItem(key) ?? null;
    }
     
    /**
     * Sets the value for a given key in the specified storage type.
     * If the storage type is not provided, it defaults to "local" storage.
     * 
     * @param key - The key to set the value for.
     * @param payload - The value to be set.
     * @param type - The type of storage to use ("local" or "session").
     */
    function set(key: string, payload: any | any[], type: "local" | "session" = "local"): void {
        // Use sessionStorage if type is "session"
        const storage = type === "session" ? sessionStorage : localStorage;
     
        // Convert payload to JSON string if it's an object
        const data = typeof payload === "object" ? JSON.stringify(payload) : payload;
     
        // Remove existing item before setting the new one
        remove(key);
     
        // Set item in storage
        storage.setItem(key, data);
    }
     
    /**
     * Removes the item with the specified key from the local storage.
     * @param key - The key of the item to remove.
     */
    function remove(key: string): void {
        localStorage.removeItem(key);
    }
 
    return {
        get,
        set,
        remove
    }
}