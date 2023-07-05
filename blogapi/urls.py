from rest_framework import routers
from .viewsets import PublicacionesRestApiViewSet

router = routers.SimpleRouter()
router.register ('publicacionesrestapi', PublicacionesRestApiViewSet)
urlpatterns = router.urls
