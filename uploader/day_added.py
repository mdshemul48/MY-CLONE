from datetime import datetime, date


def total_added_days(added_date: int):
    added_time = datetime.fromtimestamp(added_date).strftime("%Y,%m,%d").split(",")
    now_time = datetime.now().strftime("%Y,%m,%d").split(",")
    added_year, added_month, added_day = (
        int(added_time[0]),
        int(added_time[1]),
        int(added_time[2]),
    )

    now_year, now_month, now_day = int(now_time[0]), int(now_time[1]), int(now_time[2])

    added = date(added_year, added_month, added_day)
    now = date(now_year, now_month, now_day)
    total_days = now - added
    return total_days.days
