local isLoading = true

RegisterNetEvent('qr-loadingscreen:client:shutdown')
AddEventHandler('qr-loadingscreen:client:shutdown', function()
    isLoading = false
    ShutdownLoadingScreen()
end)

-- Trigger loading screen shutdown when player is spawned
AddEventHandler('playerSpawned', function()
    if isLoading then
        TriggerEvent('qr-loadingscreen:client:shutdown')
    end
end)
