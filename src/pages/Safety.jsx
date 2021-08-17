import{ Typography } from '@material-ui/core'

const Safety = () => {
  return (
    <div>
      <Typography variant="h4"> EXTREME HEAT GUIDELINES</Typography>

      <Typography paragraph>
        The BCGECSS follows BC Soccer's Extreme Heat Guidelines (PDF). It is important to err on the side of caution if you are ever in doubt regarding the health and safety of participants.

        Led by Al Moir, who as our ref coordinator is in charge of player safety, we are monitoring the heat situation. We decided to proceed with games on June 29 because temperatures were significantly lower than in previous days. Two water breaks of five minutes were provided, halfway through each half. The five minutes were deducted from each half. This protocol will be followed whenever game time temperatures exceed 25 degrees C.
      </Typography>

      <Typography variant="h4">RETURN TO PLAY PLAN (COVID-19)</Typography>

      <Typography paragraph>
        The Return to Play Plan (PDF) covers the BC Government Employees Soccer Society (BCGESS) and South Vancouver Island Classics Soccer Association (SVICSA). There is overlap in the membership of these groups, and they frequently scrimmage together, especially outside their regular seasons.

        See BC Soccer's Return to Play Information for complete details.
      </Typography>

      <Typography variant="h4">SOCCER CONCUSSION POLICY</Typography>
      <Typography paragraph>
        The BCGECSS follows BC Soccer's Concussion Policy. Information on this policy and links to additional health information are posted on BC Soccer's website (PDF).

        Also, see Canada Soccer's Concussion Guidelines (PDF). These thorough guidelines are intended for those managing concussion in soccer at all levels.
      </Typography>

      <Typography variant="h4">AIR QUALITY SAFETY GUIDELINES</Typography>
      <Typography paragraph>
        The BCGECSS is now following the BC Soccer Air Quality Guidelines (PDF). The guidelines are intended to help teams and officials assess air quality at local fields, so they can make decisions about modifying or canceling practices and games when air quality is degraded.

        The Air Quality Safety Guidelines are based on the Air Quality Health Index (AQHI).

        The Air Quality Health Index uses a scale to show the health risk associated with the air pollution we breathe. It shows levels and forecasts for a number of B.C. locations, including Greater Victoria/Saanich.

        The Air Quality Safety Guidelines recommend moderating scrimmages at AQHI of 4 to 6, as well as providing additional information.
      </Typography>
    </div>
  )
}

export default Safety
